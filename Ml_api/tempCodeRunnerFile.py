print("\nYield Details Data:")
print(yield_detail_df.head())

# Merge datasets on a common key, for example 'location'
data = pd.merge(temp_df, rainfall_df, on='location', how='inner')
data = pd.merge(data, yield_df, on='location', how='inner')
data = pd.merge(data, yield_detail_df, on='location', how='inner')

# Display merged data
print("Merged Data:")
print(data.head())

# Fill missing values; using forward-fill as an example
data.fillna(method='ffill', inplace=True)

# Suppose 'soil_type' is a categorical column. Encode using one-hot encoding.
if 'soil_type' in data.columns:
    data = pd.get_dummies(data, columns=['soil_type'])

# Preview processed data
print("Processed Data:")
print(data.head())

# Define feature columns. Adjust the feature names to match your dataset.
features = ['temperature', 'rainfall']  # start with numerical features

# If soil types were one-hot encoded, add the corresponding columns
soil_columns = [col for col in data.columns if col.startswith('soil_type_')]
features.extend(soil_columns)

# Include 'location' as a feature if needed
features.append('location')

X = data[features]
y = data['best_crop']  # Ensure this column exists in your merged data

print("Feature set preview:")
print(X.head())
print("\nTarget preview:")
print(y.head())

# Encode 'location'
if 'location' in X.columns:
    le = LabelEncoder()
