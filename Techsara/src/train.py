import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from .data_preprocessing import load_data, preprocess   # correct


def train_model():
    """Train Random Forest and save artifacts"""
    df = load_data("data/raw/prediction_data.xlsx")
    X, y, scaler, features = preprocess(df)

    X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y  # <-- ensures both train/test contain all classes
)


    model = RandomForestClassifier(
        n_estimators=200, random_state=42, class_weight="balanced"
    )
    model.fit(X_train, y_train)


    # Save artifacts
    joblib.dump(model, "models/churn_model.pkl")
    joblib.dump(scaler, "models/scaler.pkl")
    joblib.dump(features, "models/features.pkl")

    print("✅ Model trained and artifacts saved")

    return model, X_test, y_test
