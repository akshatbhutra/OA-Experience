from src.train import train_model
from src.evaluate import evaluate_model
import joblib
import os
from datetime import datetime
import csv

os.makedirs("logs", exist_ok=True)
log_file = "logs/model_metrics.csv"
print("🚀 Starting Churn ML Pipeline...")

# Step 1: Train candidate model
model, X_test, y_test = train_model()

# Step 2: Evaluate candidate
f1_new = evaluate_model(model, X_test, y_test, return_f1=True)

# Step 3: Load baseline (production) model
try:
    baseline_model = joblib.load("models/churn_model.pkl")
    f1_base = evaluate_model(baseline_model, X_test, y_test, return_f1=True)
except FileNotFoundError:
    print("⚠️ No baseline model found. Deploying candidate as baseline.")
    joblib.dump(model, "models/churn_model.pkl")
    exit()

# Step 4: Conditional deployment
if f1_new >= f1_base:
    joblib.dump(model, "models/churn_model.pkl")  # overwrite baseline
    print("✅ New model passes quality gate. Deployed!")
else:
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    os.makedirs("models/candidates", exist_ok=True)
    joblib.dump(model, f"models/candidates/candidate_{timestamp}.pkl")
    print("❌ Candidate model rejected. Baseline retained.")

os.makedirs("logs", exist_ok=True)
log_file = "logs/model_metrics.csv"

# Append metrics for this run
with open(log_file, mode="a", newline="") as f:
    writer = csv.writer(f)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    writer.writerow([timestamp, f1_new])