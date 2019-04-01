import ImagePicker from 'react-native-image-crop-picker';
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import LabelError from '../LabelError';
import UserAvatar from 'react-native-user-avatar';
import { ListItem } from "react-native-material-ui";


export default class CustomPhoto extends Component {        
    static propTypes = {
      label: PropTypes.string,
      value: PropTypes.any,
      onPhotoChange: PropTypes.func,
      disabled: PropTypes.bool,
      error: PropTypes.bool,
    };

      static defaultProps = {
        label: '',
        value: '',
        onPhotoChange: () => {},
        disabled: false,
        error: false,
      };

      onPhotoChange = (uri) => {
        const { onPhotoChange } = this.props;
        onPhotoChange(uri);
      }
      render() {
        const {
          label,
          value,
          disabled,
          error,
        } = this.props;
        const photo = (
          <UserAvatar
            size={40}
            src={value}
            name="IMG"
          />
        );
        return (
          <View> 
            <LabelError
              label={label}
              error={error}
            />
            <ListItem 
              style={{ marginLeft: 0, paddingLeft: 10 }}
              leftElement={photo}
              centerElement={{
                  primaryText: label,
              }}
              onPress={() => {
                  if (disabled) {
                      return;
                  }
                  ImagePicker.openCamera({
                      width: 480, height: 480, cropping: true, includeBase64: true,
                  })
                  .then((image) => {
                      return ImagePicker.cleanSingle(image.path).then(() => {
                          this.onPhotoChange(`data:image/png;base64,${image.data}`);
                        })
                        .catch(() => Promise.resolve());
                    }).catch(() => Promise.resolve());
               }}
            />
          </View>);
      }
}
