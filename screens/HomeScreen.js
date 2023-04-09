import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, {useLayoutEffect, useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Icons from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'
const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setfeaturedCategories] = useState([])

    useEffect(() => {
        sanityClient.fetch(`  *[_type == 'featured'] {
            ...,
            resturants[]->{
              ...,
              dishes[]->
            }
          }`).then((data) => {
            setfeaturedCategories(data)
            // console.log(data)
          })
    }, [])
  return (
    <SafeAreaView className='bg-white pt-5'>
        <View className='flex-row pb-3 items-center mx-4 space-x-2'>
            <Image source={{uri: 'https://links.papareact.com/wru'}} className='h-7 w-7 bg-gray-300 p-4 rounded-full' />

            <View className='flex-1'>
                <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
                <Text className='font-bold text-xl'> 
                Current Location 
                <Icons.ChevronDownIcon color="red" size={20} /> 
                </Text>
            </View>

            <Icons.UserIcon color="red"  size={20} />
        </View>

        {/* Search */}

        <View className='flex-row items-center space-x-2 pb-2 mx-4'>
            <View className='flex-row space-x-2 flex-1 bg-gray-200 p-3'>
                <Icons.MagnifyingGlassIcon size={20} color={'gray'} />
                <TextInput className='' placeholder='Resturants nearby' />

            </View>
            <Icons.AdjustmentsVerticalIcon color={'red'}  />
        </View>

        {/* BODY */}

        <ScrollView className='bg-gray-100' contentContainerStyle={{

        }}>
            {/* Categories */}
            <Categories />


            {/* Featured Row */}

            {featuredCategories?.map((category) => (
                <FeaturedRow key={category._id} title={category.name} id={category._id} description={category.short_description} />
                ))}

            {/* <FeaturedRow title='Featured' description='Paid promotions from our patners' id="123" />
            <FeaturedRow title='Tasty Discounts' description='Everyone been enjoying these crazy discounts' id={'1234'}  />
            <FeaturedRow title='Offers near you!' description='Why not support your local resturants tonight!' id={"12345"} /> */}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen