import * as React from 'react';
import { FlatList,Button, Text, View, TouchableOpacity, StyleSheet,Image,ScrollView,SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from "react-native";
import recipeData from './recipes.json'

var screenWidth = (Dimensions.get('window').width);

function DetailsScreen({ route }) {
  
  const { recipeName } = route.params;
  const { recipeTime } = route.params;
  const { recipeServes } = route.params;
  const { recipeImage } = route.params;
  const { recipeSteps } = route.params;
  const { recipeIngre } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{uri: recipeImage}} style={{ width: screenWidth, height: 159 }}/>
        <Text style={styles.title}>Serves: {recipeServes}</Text>
        <Text style={styles.title}>Preparation time:  {recipeTime}</Text>
        <Text style={styles.title}>Ingredients:</Text>
        <Text style={styles.standardText}>{recipeIngre}</Text>
        <Text style={styles.title}>Recipe:</Text>
        <Text style={styles.standardText}>{recipeSteps}</Text>
        <Text style={{marginBottom: 10}}></Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function RecipeScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {recipeData.map((recipe) =>
          <TouchableOpacity key={recipe.name}
          style={styles.buttonStyle} 
          onPress={() => navigation.push('Recipe', {
            name: recipe.name, 
            recipeName:recipe.name, 
            recipeTime:recipe.time,
            recipeServes:recipe.serves,
            recipeImage:recipe.image,
            recipeSteps:recipe.steps,
            recipeIngre:recipe.ingredients,
            })}>
            <Image source={{uri: recipe.image}} style={{ width: 305, height: 159 }}/>  
            <Text style={styles.listText}>{recipe.name}</Text>
          </TouchableOpacity>
        )}
        
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>

    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerStyle:{backgroundColor:'#f4511e'},
    headerTintColor:'#fff',
    headerTitleStyle:{
       
    }, 
    }}>
      <HomeStack.Screen name="Home" component={RecipeScreen} 
      options={{
        headerTitleStyle:{textAlign:'center',flex:1,}
      }}/>
      <HomeStack.Screen 
            name="Recipe" 
            component={DetailsScreen} 
            options={
            ({ route }) => ({ title: route.params.name })} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Recipes') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Recipes" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding:10,
    width: screenWidth,
    backgroundColor:'white',
    alignItems:'center',    
  },
  listText: {
    width:screenWidth,
    fontSize:20,
    color:'black',
    paddingLeft:30,
    letterSpacing:3
  },
  container: {
    flex: 1, 
    backgroundColor: "white",
    
  },
  title: {
    fontSize: 20,
    marginTop:5 ,
    marginLeft:10,
    letterSpacing:3, 
  },
  standardText: {
    fontSize: 16,
    marginTop:5,
    marginLeft:10,
    marginRight:10,

  }
});