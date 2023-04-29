import { View, Text, Image, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "react-native-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Categories from "../components/Categories";
import FeaturedRows from "../components/FeaturedRows";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == "featured"] {
          ...,
          restaurant[]->{
            ...,
            dishes[]->
          }
        }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="pt-9">
    
      {/* Header */}
      <View className=" bg-gradient-to-r from-blue-500 flex-row pb-4 items-center mx-4 space-x-2">
        <Ionicons name="paper-plane-sharp" size={20} color="#FF6347" />
         <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        /> 
        <View className="flex-1">
           <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text> 
          <Text className="font-bold text-xl px-1">
            Current Location
            <AntDesign name="down" size={15} color="gray" />
          </Text>
        </View>

        <AntDesign name="user" size={24} color="gray" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 rounded-md bg-gray-200 p-3">
          <EvilIcons name="search" size={24} color="#01A296" />
          <TextInput
            placeholder="Restraunts and cuisines"
            keyboardType="default"
          />
        </View>
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}

        {featuredCategories?.map((category) => (
          <FeaturedRows
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_desc}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
