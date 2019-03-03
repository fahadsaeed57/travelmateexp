import React from 'react';
import { Animated, Text, View } from 'react-native';

export default class LogoAnimation extends React.Component {
  state = {
    margin: new Animated.Value(200),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.margin,            // The animated value to drive
      {
        toValue: -50,                   // Animate to opacity: 1 (opaque)
        duration: 2000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { margin } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          marginTop: margin,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

