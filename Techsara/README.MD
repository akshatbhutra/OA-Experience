Project Overview

I implemented an end-to-end Customer Churn Prediction ML pipeline using Python. The pipeline preprocesses customer data, trains a Random Forest model, evaluates performance, and deploys the model via a FastAPI endpoint. I chose this because it allowed me to demonstrate MLOps best practices, including modular code, reproducibility through saved artifacts (churn_model.pkl, scaler.pkl, features.pkl), and deployment-ready API for real-time predictions.

How to Run the Code

Install dependencies:

python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt


Run the pipeline:

python run_pipeline.py


Start the API for predictions:

uvicorn src.api:app --reload


Access Swagger UI at http://127.0.0.1:8000/docs to submit customer data and get churn probabilities.

Assumptions & Limitations

The model assumes categorical values in input match training data; unseen categories are ignored.

Predictions are only as accurate as the Random Forest model trained on the provided dataset.

ROC-AUC may be undefined if the test set contains only one class.

The pipeline currently does not include automatic model versioning or continuous retraining.
