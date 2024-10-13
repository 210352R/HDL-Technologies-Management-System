import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';

// Dummy list of customers
const customersData = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
  { id: '3', name: 'Michael Johnson', email: 'michael.j@example.com', phone: '456-789-1230' },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@example.com', phone: '321-654-9870' },
  { id: '5', name: 'Chris Brown', email: 'chris.brown@example.com', phone: '789-456-1230' },
];

// Card component for individual customer
const CustomerCard = ({ customer }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{customer.name}</Text>
      <Text style={styles.details}>Email: {customer.email}</Text>
      <Text style={styles.details}>Phone: {customer.phone}</Text>
    </View>
  );
};

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customersData);

  // Function to filter customers based on search query
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredList = customersData.filter((customer) =>
        customer.name.toLowerCase().includes(text.toLowerCase()) ||
        customer.email.toLowerCase().includes(text.toLowerCase()) ||
        customer.phone.includes(text)
      );
      setFilteredCustomers(filteredList);
    } else {
      setFilteredCustomers(customersData);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customers</Text>

      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name, email, or phone"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* FlatList to render customer cards */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CustomerCard customer={item} />}
        ListEmptyComponent={<Text style={styles.noResults}>No customers found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    height: 120,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  noResults: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Customers;
