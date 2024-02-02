from flask import Flask, request, jsonify
import numpy as np
import json
from sklearn.tree import _tree
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the classifier JSON
with open('classifier.json', 'r') as clf_file:
    classifier_json = json.load(clf_file)

def classify_tree(tree, features):
       # Check if the 'feature' key is present
        if 'feature' in tree:
            # Split node
            if features[tree['feature']] <= tree['threshold']:
                return classify_tree(tree['left'], features)
            else:
                return classify_tree(tree['right'], features)
        else:
            # Leaf node
            if 'value' in tree:
                return np.argmax(tree['value'])
            else:
                # Handle leaf nodes without 'value' key
                return np.argmax(tree)

def classify_forest(features):
    predictions = [classify_tree(tree, features) for tree in classifier_json['estimators']]
    class_counts = np.bincount(predictions, minlength=classifier_json['n_classes'])
    predicted_class = np.argmax(class_counts)
    return predicted_class

@app.route('/classify', methods=['POST'])
def classify():
    data = request.get_json();
    print(data)
    input_features = data['features']

    # Ensure the input features have the same length as expected
    if len(input_features) != classifier_json['n_features']:
        raise ValueError(f"Input features must have {classifier_json['n_features']} elements.")

    # Convert input features to a NumPy array
    input_features = np.array(input_features)

    # Make predictions
    prediction = classify_forest(input_features)

    # Return the prediction as JSON
    return jsonify({'prediction': int(prediction)})
    # return jsonify({'prediction': 'a'})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
