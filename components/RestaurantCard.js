import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_desc,
  dishes,
  long,
  lat,

}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={() => {
      navigation.navigate('Restaurant',{
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_desc,
        dishes,
        long, 
        lat,

      });
    }}
     className="bg-white mr-3 shadow">
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <Entypo name="star" size={18} color="orange" />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> · {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <EvilIcons name="location" size={18} color="black" />
          <Text className="text-xs text-gray-500">Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;