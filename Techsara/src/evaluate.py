import numpy as np
from sklearn.metrics import classification_report, roc_auc_score

def evaluate_model(model, X_test, y_test):
    preds = model.predict(X_test)
    proba = model.predict_proba(X_test)

    # Ensure proba has two columns
    if proba.shape[1] == 1:
        proba = np.concatenate([1 - proba, proba], axis=1)

    print("📊 Classification Report:")
    print(classification_report(y_test, preds))
    print("ROC-AUC:", roc_auc_score(y_test, proba[:, 1]))
