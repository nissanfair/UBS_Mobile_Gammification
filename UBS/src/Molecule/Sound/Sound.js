import adventure from '../../../media/Soundtracks/main/adventure.wav';
import press from '../../../media/Soundtracks/main/press.wav';
import fighting from '../../../media/Soundtracks/main/fighting.wav';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

export var userPress = new Sound(press, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log('duration in seconds: ' + userPress.getDuration() + 'number of channels: ' + userPress.getNumberOfChannels());
  });

  export var adven = new Sound(adventure, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log('duration in seconds: ' + adven.getDuration() + 'number of channels: ' + adven.getNumberOfChannels());
  });

export var fight = new Sound(fighting, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log('duration in seconds: ' + fight.getDuration() + 'number of channels: ' + fight.getNumberOfChannels());
  })

  songArray = [adventure, userPress, fighting]