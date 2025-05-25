import { mapContacts, fetchContactsSuccess } from "./Store";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import ContactListItem from "./ContactListItem";

const keyExtractor = (item) => item.id;

const fetchContacts = async () => {
  const data = await fetch("https://randomuser.me/api/?results=50");
  const ContactData = await data.json();
  // console.log(ContactData);
  return ContactData.results.map(mapContacts);
};

const Contacts = ({ navigation }) => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchContacts()
      .then((contacts) => {
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch((e) => {
        console.error("Failed to fetch contacts", e);
      });
  }, []);

  const renderContacts = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("ProfileContact", { contact: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderContacts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Contacts;
