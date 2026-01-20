CHURN_ANALYSIS_PROJECT/
├── data/
│ └── raw/prediction_data.xlsx # Original dataset
├── models/
│ ├── churn_model.pkl # Trained Random Forest model
│ ├── scaler.pkl # Feature scaler
│ └── features.pkl # Columns after preprocessing
├── src/
│ ├── init.py
│ ├── data_preprocessing.py # Data cleaning & feature encoding
│ ├── train.py # Model training & saving artifacts
│ ├── evaluate.py # Model evaluation & metrics
│ └── api.py # FastAPI deployment
├── notebooks/
│ └── churn_prediction.ipynb # Original notebook for experimentation
├── run_pipeline.py # Orchestrates training & evaluation
├── requirements.txt # Python dependencies
└── README.md # Project documentation


---

## 🛠 Setup Instructions

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd CHURN_ANALYSIS_PROJECT


Create virtual environment

python -m venv .venv
.venv\Scripts\activate       # Windows
# or
source .venv/bin/activate    # Mac/Linux


Install dependencies

pip install -r requirements.txt

🚀 Running the Pipeline

Run the end-to-end pipeline:

python run_pipeline.py


Steps executed:

Load & preprocess data (data_preprocessing.py)

Train Random Forest model (train.py)

Evaluate model metrics (evaluate.py)

Save artifacts in models/:

churn_model.pkl

scaler.pkl

features.pkl

Check evaluation results

Classification report printed to console

ROC-AUC (if both classes are present)

Model artifacts saved for deployment

⚡ FastAPI Deployment

Start API:

uvicorn src.api:app --reload


Open Swagger UI in browser:

http://127.0.0.1:8000/docs


Test predictions with JSON input:

{
  "Gender": "Male",
  "Married": "Yes",
  "State": "CA",
  "Value_Deal": "Yes",
  "Phone_Service": "Yes",
  "Multiple_Lines": "No",
  "Internet_Service": "Fiber",
  "Internet_Type": "Broadband",
  "Online_Security": "Yes",
  "Online_Backup": "No",
  "Device_Protection_Plan": "Yes",
  "Premium_Support": "No",
  "Streaming_TV": "Yes",
  "Streaming_Movies": "No",
  "Streaming_Music": "Yes",
  "Unlimited_Data": "Yes",
  "Contract": "Monthly",
  "Paperless_Billing": "Yes",
  "Payment_Method": "Credit Card",
  "Monthly_Charge": 75.0,
  "Total_Revenue": 1200.0,
  "Tenure_Months": 16
}


Response:

{
  "churn_probability": 0.23
}

🧩 MLOps Extensions

Pipeline Automation: run_pipeline.py orchestrates preprocessing, training, and evaluation.

Artifact Management: All trained artifacts saved in models/ for reproducibility.

Conditional Deployment: (Optional) Future extension — deploy only if new model metric exceeds baseline.

Versioning: Model files can include timestamps for version tracking.

📊 Model Performance

Example output from pipeline:

Classification Report:
              precision    recall  f1-score   support

           0       1.00      1.00      1.00        76

    accuracy                           1.00        76
   macro avg       1.00      1.00      1.00        76
weighted avg       1.00      1.00      1.00        76

ROC-AUC: 0.91


Note: ROC-AUC may be nan if the test set contains only one class. Use stratified split to prevent this.