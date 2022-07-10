/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
	Button,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	useColorScheme,
	View,
} from 'react-native';

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { HMSTextToSpeech } from '@hmscore/react-native-hms-ml';

const Section = ({ children, title }) => {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<View style={styles.sectionContainer}>
			<Text
				style={[
					styles.sectionTitle,
					{
						color: isDarkMode ? Colors.white : Colors.black,
					},
				]}
			>
				{title}
			</Text>
			<Text
				style={[
					styles.sectionDescription,
					{
						color: isDarkMode ? Colors.light : Colors.dark,
					},
				]}
			>
				{children}
			</Text>
		</View>
	);
};

const App = () => {
	const [inputState, setInputState] = useState('');

	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	useEffect(() => {
		initTTS();
	}, []);

	const initTTS = () => {
		HMSTextToSpeech.createEngine({
			volume: 1.0, // Speaker volume.
			speed: 1.0, // Speaker speed.
			language: HMSTextToSpeech.TTS_EN_US, // Speaker language.
			person: HMSTextToSpeech.TTS_SPEAKER_FEMALE_EN, // Speaker.
			synthesizeMode: HMSTextToSpeech.TTS_ONLINE_MODE, // Synthesize mode.
		})
			.then((res) => {
				console.log('initialized tts', { res });
			})
			.catch((err) => {
				console.log('failed to initialized tts', { err });
			});
	};

	const handleReadText = (text) => {
		console.warn({ text });
		MSTextToSpeech.speak(
			'hello', // Text.
			HMSTextToSpeech.QUEUE_FLUSH // Speaker mode.
		)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={backgroundStyle}
			>
				{/* <Header /> */}
				<TextInput
					placeholder="enter text to read"
					onTextInput={setInputState}
					value={inputState}
				/>
				<Button onPress={() => handleReadText(inputState)} title="Read Text" />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
