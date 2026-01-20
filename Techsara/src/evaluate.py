from sklearn.metrics import classification_report, f1_score

def evaluate_model(model, X_test, y_test, return_f1=False):
    y_pred = model.predict(X_test)
    print("📊 Classification Report:\n", classification_report(y_test, y_pred))
    
    f1 = f1_score(y_test, y_pred)
    print(f"F1-score: {f1:.4f}")

    if return_f1:
        return f1
