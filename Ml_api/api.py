from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Load the dataset and train the model
# (Assuming the CSV file is in the same directory)
data = pd.read_csv('Crop_recommendation.csv')
features = data[['ph', 'rainfall', 'temperature', 'humidity']]
target = data['label']

# Initialize and train the Random Forest classifier
model = RandomForestClassifier(random_state=42)
model.fit(features, target)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    # Get data from request
    input_data = request.get_json()
    temperature = input_data.get('temperature', 25)
    rainfall = input_data.get('rainfall', 100)
    humidity = input_data.get('humidity', 50)
    ph = 6.5  # Default pH value

    # Create a DataFrame for the input
    sample = pd.DataFrame({
        'ph': [ph],
        'rainfall': [rainfall],
        'temperature': [temperature],
        'humidity': [humidity]
    })

    # Predict the crop
    predicted_crop = model.predict(sample)[0]

    # Return the predicted crop
    return jsonify({'predicted_crop': predicted_crop})

if __name__ == '__main__':
    app.run(debug=True) 