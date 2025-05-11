import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';

const ExpenseTrackerUI = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [pocketMoney, setPocketMoney] = useState(5000); // Initial pocket money
  const [remainingBalance, setRemainingBalance] = useState(pocketMoney);

  // Add Expense Transaction
  const addTransaction = () => {
    if (!description || !category || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTransaction = {
      id: Math.random().toString(),
      description,
      category,
      amount: parseFloat(amount),
    };

    // Add the transaction
    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);

    // Update remaining balance
    setRemainingBalance((prevBalance) => prevBalance - parseFloat(amount));

    // Reset form inputs
    setDescription('');
    setCategory('');
    setAmount('');
  };

  // Remove Transaction
  const removeTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);

    // Recalculate remaining balance
    const removedTransaction = transactions.find((transaction) => transaction.id === id);
    setRemainingBalance((prevBalance) => prevBalance + removedTransaction.amount);
  };

  // Calculate total expenses
  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Expense Tracker</Text>
        <Text style={styles.balanceText}>
          <Text style={styles.boldText}>Pocket Money: </Text>PKR {pocketMoney}
        </Text>
        <Text style={styles.balanceText}>
          <Text style={styles.boldText}>Remaining: </Text>PKR {remainingBalance.toFixed(2)}
        </Text>
        <Text style={styles.balanceText}>
          <Text style={styles.boldText}>Total Expenses: </Text>PKR {totalExpenses.toFixed(2)}
        </Text>
      </View>

      {/* Transaction Form Section */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTransaction}>
          <Text style={styles.addButtonText}>+ Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions Section */}
      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <ScrollView contentContainerStyle={styles.transactionsList}>
          {transactions.map((item) => (
            <View style={styles.transactionItem} key={item.id}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>
                  {item.description} ({item.category})
                </Text>
                <Text
                  style={[
                    styles.transactionAmount,
                    item.amount < 0 ? styles.expenseAmount : styles.incomeAmount,
                  ]}
                >
                  PKR {item.amount.toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeTransaction(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  header: { marginBottom: 30, alignItems: 'center', paddingTop: 50 },
  headerText: { fontSize: 30, fontWeight: 'bold', color: '#3b5998' },
  balanceText: { fontSize: 16, marginTop: 10, color: '#333333' },
  boldText: { fontWeight: 'bold', color: '#3b5998' }, // Bold text color
  form: { marginBottom: 20 },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  transactionsSection: { marginBottom: 20, flex: 1 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333333' },
  transactionsList: {
    flexGrow: 1,
    paddingBottom: 20, // To ensure the scroll works and content is properly visible
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  transactionInfo: { flex: 1 },
  transactionDescription: { fontSize: 16, color: '#333333' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
  expenseAmount: { color: '#FF6347' }, // Tomato Red for expenses
  incomeAmount: { color: '#32CD32' }, // Lime Green for income
  removeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  removeButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});

export default ExpenseTrackerUI;
