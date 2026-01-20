from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np

app = FastAPI()

# Load artifacts
model = joblib.load("models/churn_model.pkl")
scaler = joblib.load("models/scaler.pkl")
features = joblib.load("models/features.pkl")  # List of training columns

# Define request schema
class CustomerData(BaseModel):
    Gender: str
    Married: str
    State: str
    Value_Deal: str
    Phone_Service: str
    Multiple_Lines: str
    Internet_Service: str
    Internet_Type: str
    Online_Security: str
    Online_Backup: str
    Device_Protection_Plan: str
    Premium_Support: str
    Streaming_TV: str
    Streaming_Movies: str
    Streaming_Music: str
    Unlimited_Data: str
    Contract: str
    Paperless_Billing: str
    Payment_Method: str
    Monthly_Charge: float
    Total_Revenue: float
    Tenure_Months: int

@app.post("/predict")
def predict(data: CustomerData):
    try:
        # Convert to DataFrame
        df = pd.DataFrame([data.dict()])

        # One-hot encode categorical columns
        df_encoded = pd.get_dummies(df)

        # Add missing columns from training
        missing_cols = set(features) - set(df_encoded.columns)
        for col in missing_cols:
            df_encoded[col] = 0

        # Ensure column order matches training
        df_encoded = df_encoded[features]

        # Scale features
        X_scaled = scaler.transform(df_encoded)

        # Predict probability safely
        prob = model.predict_proba(X_scaled)
        if prob.shape[1] == 1:
            prob = np.hstack([1 - prob, prob])
        churn_prob = float(prob[0, 1])

        return {"churn_probability": churn_prob}

    except Exception as e:
        return {"error": str(e)}
