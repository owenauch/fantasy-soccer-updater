import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { View, Button, Text } from 'react-native'
import moment from 'moment'

export default class MyDatePicker extends Component {
  constructor (props) {
    super(props)
    const d = moment(new Date()).format('YYYY-MM-DD')
    this.state = {
      date: d,
      success: null
    }
  }

  updateMatchStats = () => {
    const url = 'https://dilly-league-backend.herokuapp.com/api/update-match-stats/' + this.state.date + '/'
    fetch(url)
    .then((response) => {
      if (response.ok) {
        this.setState({success: true})
      } else {
        this.setState({success: false})
      }
    })
  }

  updatePlayers = () => {
    fetch('https://dilly-league-backend.herokuapp.com/api/update-players/')
    .then((response) => {
      if (response.ok) {
        this.setState({success: true})
      } else {
        this.setState({success: false})
      }
    })
  }

  render () {
    return (
      <View>
        <Text
          style={{textAlign: 'center', fontSize: 25}}
        >
          Dilly League Updater
        </Text>
        <Text
          style={{textAlign: 'center', fontSize: 25, marginBottom: 45}}
        >
          (don't spam it!)
        </Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode='date'
          placeholder='select date'
          format='YYYY-MM-DD'
          minDate='2018-01-01'
          maxDate={moment(new Date()).format('YYYY-MM-DD')}
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => { this.setState({date: date}) }}
        />
        <Button
          onPress={() => this.updateMatchStats()}
          title='Update Match Stats'
        />
        <Button
          onPress={() => this.updatePlayers()}
          title='Update Players'
        />
        {this.state.success === true && <Text style={{textAlign: 'center'}}>Successfully updated!</Text>}
        {this.state.success === false && <Text style={{textAlign: 'center'}}>Update failed!</Text>}
      </View>

    )
  }
}
