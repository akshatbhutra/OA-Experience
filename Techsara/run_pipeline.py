from src.train import train_model
from src.evaluate import evaluate_model

if __name__ == "__main__":
    print("🚀 Starting Churn ML Pipeline...")

    print("\n📌 Step 1: Training model")
    model, X_test, y_test = train_model()

    print("\n📌 Step 2: Evaluating model")
    evaluate_model(model, X_test, y_test)

    print("\n✅ Pipeline completed successfully")
