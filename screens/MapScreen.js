import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import * as actions from '../actions';

class MapScreen extends React.Component {
    static navigationOptions = () => {
        return {
            title: 'Map',
            tabBarIcon: ({ tintColor }) => {    
                return <Icon name='my-location' size={30} color={tintColor} />;
            }
        };
    }
    
    state = { 
        mapLoaded: false,
        region: {
            latitude: 49.28883325048375,
            latitudeDelta: 0.28942351176355174,
            longitude: -123.13505564733309,
            longitudeDelta: 0.23888898445666484,
          }
    }

    componentDidMount() {
        this.setState({ mapLoaded: true });
    }

    onRegionChangeComplete = (region) => {
        this.setState({ region });
    }

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    }

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }} >
                <MapView 
                    region={this.state.region}
                    style={{ flex: 1 }} 
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.buttonContainer} >
                    <Button 
                        large
                        title='Search This Area'
                        backgroundColor='#009688'
                        icon={{ name: 'search' }}
                        onPress={this.onButtonPress} 
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10
    }
};

export default connect(null, actions)(MapScreen);
