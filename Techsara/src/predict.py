import joblib
import pandas as pd

def predict(input_path):
    model = joblib.load("models/churn_model.pkl")
    scaler = joblib.load("models/scaler.pkl")
    features = joblib.load("models/features.pkl")

    df = pd.read_excel(input_path)
    df = pd.get_dummies(df, drop_first=True)
    df = df.reindex(columns=features, fill_value=0)

    X = scaler.transform(df)
    df["Churn_Probability"] = model.predict_proba(X)[:, 1]

    df.to_csv("data/processed/scored_output.csv", index=False)
    print("Predictions saved.")
