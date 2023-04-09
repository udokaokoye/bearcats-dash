import { View, Text, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import * as Icons from 'react-native-heroicons/outline'
import ResturantCard from './ResturantCard'
import sanityClient from '../sanity'
const FeaturedRow = ({id, title, description}) => {
    const [resturants, setresturants] = useState([])

    useEffect(() => {
        // console.log(id)
        sanityClient.fetch(`
        *[_type == 'featured' && _id == '${id}'] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type-> {
                name
            }
          }
        }
        `,).then((data) => {
            setresturants(data[0].restaurants)
          console.log(data[0].restaurants[0].image)
        })
    }, [])
    
    
  return (
    <View>
      <View className='mt-4 flex-row items-center justify-between px-4 '>
        <Text className='font-bold text-lg'>{title}</Text>
        <Icons.ArrowRightIcon color={'red'}/>
      </View>

      <Text className='text-xs text-gray-500 px-4'>{description}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle=
      {{
        paddingHorizontal: 15
      }} className='pt-4'>

        {/* Resturant Crads */}

        {resturants?.map(resturant => (
             <ResturantCard 
             key={resturant._id}
             id={resturant._id}
             imgUrl= {resturant.image}
             title={resturant.name}
             rating={resturant.rating}
             genre={resturant.type?.name}
             address={resturant.address}
             short_description={resturant.short_description}
             dishes={resturant.dishes}
             long={resturant.long}
             lat={resturant.lat}
             />
))}



      </ScrollView>
    </View>
  )
}

export default FeaturedRow