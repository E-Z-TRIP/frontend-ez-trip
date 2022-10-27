import moment from "moment";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import DateRangePicker from "rnv-date-range-picker";

export default function Prout ({ navigation }) {


  const [selectedRange, setRange] = useState({});
  

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <DateRangePicker
          onSelectDateRange={(range) => {
            setRange(range);
          }}
          responseFormat="YYYY-MM-DD"
          maxDate={moment()}
          minDate={moment().subtract(100, "days")}
        />
        <View style={styles.container}>
          <Text>Departure: {selectedRange.firstDate}</Text>
          <Text>Return: {selectedRange.secondDate}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
});

