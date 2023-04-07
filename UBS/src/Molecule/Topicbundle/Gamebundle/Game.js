import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, Button, Animated, BackHandler} from 'react-native';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setSelectedTimeState, setShowSummary, setTotal_Questions, set_answered_correctly, set_answered_wrongly, set_game_status } from "../../../Redux/questionSlice"
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { styles } from "../../../Styling";

import Question from './Questions';
import Timer from './Timeline';
import HealthBar from './Health';

//sfx
import heroAttack from '../../../../media/Soundtracks/main/hero_attack.wav';
import monsterAttack from '../../../../media/Soundtracks/main/monster_attack.wav';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
var hero = new Sound(heroAttack, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
});

var monster = new Sound(monsterAttack, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
});
//end of sfx

const Stack = createStackNavigator();


const Game = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()

    // Health variables
    const [health, modifyHealth] = useState(3)


    // Health decreases due to wrong question
    const wronglyAnsweredQuestion = useSelector((state) => state.question.answered_wrongly);
    // Health decrease due to lack of time
    const noTimeLeft = useSelector((state) => state.question.timestate)
    // Accounting for gamestatus 
    const gamestatus = useSelector((state) => state.question.gamestatus)

    const showSummary = useSelector((state) => state.question.showSummary);


    // Disable back button
    useEffect(() => {
        const handleBackButton = () => true; // returning true disables the back button
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);


    useEffect(() => {
        if (gamestatus == "RESET") {
            navigation.navigate("Summary")
        }
    }, [gamestatus])

    // Animation for Correctly Answered ######################################################################################################################################################
    const answered_correctly = useSelector((state) => state.question.answered_correctly);

    const [characterFadeAnimation] = useState(new Animated.Value(1)); // This is for BOSS
    const [heroFadeAnimation] = useState(new Animated.Value(1)); // This is for HERO
    const [questionFadeAnimation] = useState(new Animated.Value(1)); // initialize fade animation to 1 (fully opaque)


    const [heroState, setHeroState] = useState('idle');   // IDLE OR ATTACK ONLY 
    const [bossState, setBossState] = useState("idle")  // IDLE OR ATTACK ONLY xd

    useEffect(() => {
        if (answered_correctly !== 0) {
            console.log("answered_correctly: " + answered_correctly)
            // fade out Question component from 0th to 1st second
            Animated.timing(questionFadeAnimation, {
                toValue: 0,
                duration: 10,
                useNativeDriver: true,
            }).start(() => {
                // set HeroState to "attack" and change back to "idle" at the end of it (2nd to 3rd seconds)
                setHeroState('attack');
                setTimeout(() => {
                    setHeroState('idle');
                }, 1000); // assuming HeroState has a 1 second animation

                hero.setVolume(1.0);
                hero.play();

                // tint color animation for Character 2 Image Component from 4th to 6th seconds
                Animated.sequence([
                    Animated.timing(characterFadeAnimation, {
                        toValue: 0, // assuming a 20% tint color
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(characterFadeAnimation, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(characterFadeAnimation, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(characterFadeAnimation, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(characterFadeAnimation, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(characterFadeAnimation, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                ]).start();

                // fade in Question component from 6th to 7th seconds
                setTimeout(() => {
                    Animated.timing(questionFadeAnimation, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }).start();
                }, 1200);
            });
        }
    }, [answered_correctly]);
    // End of Animation for Correctly Answered ###########################################################################
    // Start of Animation for Wrongly Answered ###########################################################################
    useEffect(() => {
        if (wronglyAnsweredQuestion !== 0) {
            console.log("answered_correctly: " + answered_correctly)
            // fade out Question component from 0th to 1st second
            Animated.timing(questionFadeAnimation, {
                toValue: 0,
                duration: 10,
                useNativeDriver: true,
            }).start(() => {
                // set HeroState to "attack" and change back to "idle" at the end of it (2nd to 3rd seconds)
                setBossState('attack');
                setTimeout(() => {
                    setBossState('idle');
                }, 2000); // assuming HeroState has a 1 second animation

                monster.setVolume(1.0);
                monster.play();

                // tint color animation for Character 2 Image Component from 4th to 6th seconds
                Animated.sequence([
                    Animated.timing(heroFadeAnimation, {
                        toValue: 1, // assuming a 20% tint color
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heroFadeAnimation, {
                        toValue: 0, // assuming a 20% tint color
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heroFadeAnimation, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heroFadeAnimation, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heroFadeAnimation, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heroFadeAnimation, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(heroFadeAnimation, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                ]).start();

                // fade in Question component from 6th to 7th seconds
                setTimeout(() => {
                    Animated.timing(questionFadeAnimation, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }).start();
                }, 1200);
            });
        }
    }, [wronglyAnsweredQuestion]);
    // End of Animation for Wrongly Answered ###########################################################################

    return (
        <View style={{ flexDirection: "column", flex: 1, }} >
            <ImageBackground source={require("../../../../media/Environment/craftpix-897715-free-pixel-art-fantasy-2d-battlegrounds/PNG/Battleground3/Bright/Battleground3.png")}
                // style={styles.background}
                style={{ width: '100%', height: "100%" }}
            >
                <View style={{ flex: 10 }}>
                    <View style={{ width: "100%", height: "100%" }}>
                        <View style={{ alignContent: "center", alignItems: "center", marginTop: 15 }}>
                            <Timer />
                        </View>
                        {/* Character Side */}
                        <View style={{ marginTop: 25, height: "70%", flexDirection: "row" }}>

                            {/* Character 1  */}
                            <View style={{ flex: 1, height: "100%", width: '100%' }}>
                                <View style={{ flexDirection: "column", height: "100%", width: '100%' }}>
                                    <View style={{ flex: 3 }}></View>
                                    <View style={{ flex: 6 }}>
                                        <Animated.View style={{ opacity: heroFadeAnimation }}>
                                            {heroState == "idle" ?
                                                <Image style={{ height: "100%", width: "100%", alignSelf: 'center' }} source={require("../../../adventure.gif")} />
                                                :
                                                <Image style={{ height: "100%", width: "100%", alignSelf: 'center' }} source={require("../../../attack1.gif")} />
                                            }
                                        </Animated.View>
                                    </View>
                                    <View style={{ flex: 2 }}>
                                        <View style={{ alignContent: 'center', justifyContent: "center", alignSelf: "center" }}>
                                            <HealthBar numWrongAnswers={wronglyAnsweredQuestion} timeState={noTimeLeft} gameStatus={gamestatus} />
                                        </View>

                                    </View>


                                </View>
                            </View>
                            {/* Questions */}

                            <View style={{ height: "100%", width: '100%', flex: 3, alignContent: 'center', alignItems: 'center' }}>
                                <Animated.View style={{ opacity: questionFadeAnimation }}>
                                    <Question gameStatus={gamestatus} />
                                </Animated.View>
                            </View>



                            {/* Character 2 */}
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: "column", height: "100%", width: '100%' }}>
                                    <View style={{ flex: 1 }}></View>
                                    <View style={{ flex: 100 }}>
                                        <Animated.View style={{ opacity: characterFadeAnimation }}>
                                            {bossState == "idle"
                                                ?
                                                <Image style={{ height: '100%', aspectRatio: 1, alignSelf: 'center' }} source={require('../../../sorcereridle.gif')} />
                                                :
                                                <Image style={{ height: '100%', aspectRatio: 1, alignSelf: 'center' }} source={require('../../../../media/Characters/sorcerer_villain/SorcererAttack.gif')} />

                                            }

                                        </Animated.View>
                                    </View>
                                    <View style={{ flex: 1 }}></View>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>

            </ImageBackground>

        </View>
    );
};



export default Game 