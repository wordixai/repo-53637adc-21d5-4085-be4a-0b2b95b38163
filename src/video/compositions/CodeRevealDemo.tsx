import React from 'react';
import { CodeBlock } from '../components/CodeBlock';

const pythonCode = `# Machine Learning Pipeline
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

class MLPipeline:
    def __init__(self, model=None):
        self.model = model or RandomForestClassifier(n_estimators=100)
        self.is_fitted = False
        
    def preprocess_data(self, data):
        """Clean and prepare data for training"""
        # Handle missing values
        data = data.fillna(data.mean())
        
        # Feature scaling
        from sklearn.preprocessing import StandardScaler
        scaler = StandardScaler()
        numeric_columns = data.select_dtypes(include=[np.number]).columns
        data[numeric_columns] = scaler.fit_transform(data[numeric_columns])
        
        return data
    
    def train(self, X, y):
        """Train the machine learning model"""
        print("Starting model training...")
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train the model
        self.model.fit(X_train, y_train)
        self.is_fitted = True
        
        # Evaluate performance
        predictions = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)
        
        print(f"Model trained successfully!")
        print(f"Accuracy: {accuracy:.3f}")
        
        return {
            'accuracy': accuracy,
            'predictions': predictions,
            'test_labels': y_test
        }
    
    def predict(self, X):
        """Make predictions on new data"""
        if not self.is_fitted:
            raise ValueError("Model must be trained before making predictions")
            
        return self.model.predict(X)
    
    def feature_importance(self):
        """Get feature importance scores"""
        if hasattr(self.model, 'feature_importances_'):
            return self.model.feature_importances_
        else:
            return None

# Usage example
if __name__ == "__main__":
    # Load your dataset
    data = pd.read_csv('dataset.csv')
    
    # Initialize pipeline
    pipeline = MLPipeline()
    
    # Prepare features and target
    X = data.drop('target', axis=1)
    y = data['target']
    
    # Preprocess data
    X_processed = pipeline.preprocess_data(X)
    
    # Train model
    results = pipeline.train(X_processed, y)
    
    print("Training completed successfully!")`;

export const CodeRevealDemo: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <CodeBlock 
        code={pythonCode}
        language="python"
        startFrame={0}
        endFrame={300}
        lineByLine={true}
        typewriterEffect={true}
      />
      
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          borderRadius: '50%',
          opacity: 0.1,
          filter: 'blur(40px)'
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(45deg, #f59e0b, #ef4444)',
          borderRadius: '50%',
          opacity: 0.1,
          filter: 'blur(30px)'
        }}
      />
    </div>
  );
};