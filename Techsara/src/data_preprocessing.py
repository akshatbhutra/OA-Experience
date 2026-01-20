import pandas as pd
from sklearn.preprocessing import StandardScaler

def load_data(path):
    """Load data from Excel"""
    return pd.read_excel(path)

def preprocess(df):
    """
    Drop unnecessary columns, encode target, scale features
    """
    df = df.copy()

    # Drop ID columns
    if "Customer_ID" in df.columns:
        df = df.drop(columns=["Customer_ID"])

    # Encode target
    y = (df["Customer_Status"] == "Churned").astype(int)
    X = df.drop(columns=["Customer_Status"])

    # One-hot encode categorical variables
    X = pd.get_dummies(X, drop_first=True)

    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    return X_scaled, y, scaler, X.columns
