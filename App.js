import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Picker } from '@react-native-picker/picker';

export default function App() {

  // asetetaan oletusarvot muuttujiin 
  const [weight, setWeight] = useState(0);
  const [intensity, setIntensity] = useState(1.3);
  const [gender, setGender] = useState('male');
  const [calories, setCalories] = useState(0);

  // luodaan array, joka tulostuu user interfacelle kun avaa pudotusvalikon 
  // .push lisää aina uuden elementin arrayhin viimeisimmän perään
  const intensities=Array();
  intensities.push({label:'light', value: 1.3});
  intensities.push({label:'usual', value: 1.5});
  intensities.push({label:'moderate', value: 1.7});
  intensities.push({label:'hard', value: 2});
  intensities.push({label:'very hard', value: 2.2});

  // luodaan array (??) radio button vaihtoehdoille
  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ];

  // luodaan funktio, jolla voidaan toimittaa kalorien laskeminen
  function calculate() {
    let result = 0;
    if (gender === 'male') {
      result = (879 + 10.2 * weight) * intensity;
    }
    else {
      result = (795 + 7.18 * weight) * intensity;
    }
    setCalories(result);
  }


  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setWeight(text)} // onChangeText vaihtaa syötetyn tekstin setWeight muuttujan arvoksi
          placeholder='in kilograms'
          keyboardType='numeric'>
          </TextInput>
      </View>
      <View style={styles.field}>
        <Text>Intensity</Text>
        <Picker style={styles.intensity} // picker-elementillä luodaan pudotusvalikko
          onValueChange={(itemValue) => setIntensity(itemValue)} 
          // kun käyttäjä valitsee valikosta vaihtoehdon, se lisätään setIntensityllä muuttujan intensity arvoksi
          // selectedValue = this is the value which has been selected by the end-user from the multiple options.
          selectedValue={intensity}> 
            {intensities.map((intensity,index) => ( 
              // Picker-valikon sisäpuolelle tulostuu intensity-array map-toiminnon avulla
              // Pitää käyttää intensity, index parametrejä koska kyseessä on kai olio?
              <Picker.Item key={index} label={intensity.label} value={intensity.value} />
            ))}
          </Picker>
      </View>
      <View style={styles.field}>
        <Text>Gender</Text>
        <RadioForm
          style={styles.radio}
          buttonSize = {10}
          radio_props={genders}
          initial={0}
          onPress={(value) => {setGender(value)}} 
        />
        <Text>{calories.toFixed(0)}</Text>
      </View>
      <Button onPress={calculate} title='Calculate'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  field: {
    margin: 10,
  },
  input: {
    marginLeft: 10,
  },
  radio: {
    marginTop: 10,
    marginBottom: 10,
  }
});
