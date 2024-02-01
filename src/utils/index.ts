import type { AxiosError } from 'axios';
import { formatDistanceStrict } from 'date-fns';
import * as WebBrowser from 'expo-web-browser';
import { Linking, Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { theme } from '@/theme';

const ALLOWED_EXTERNAL_URI_SCHEMES = ['http://', 'https://'];

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

// for onError
export const showError = (error: AxiosError) => {
  const description = extractError(error?.response?.data).trimEnd();

  showMessage({
    message: 'Error',
    description,
    type: 'danger',
    duration: 4000,
    icon: 'danger',
  });
};

export const showErrorMessage = (message: string = 'Something went wrong ') => {
  showMessage({
    message,
    type: 'danger',
    duration: 4000,
  });
};

export const showSuccessMessage = (
  message: string = 'Something went wrong '
) => {
  showMessage({
    message,
    type: 'success',
    duration: 4000,
  });
};

export const extractError = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    const messages = data.map((item) => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map((item) => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};

export const capitalizeEachWord = (input: string) => {
  const arr = input.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(' ');
};

export function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function convertMsToTime(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  console.log('hours', hours);

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

export function timeAgo(dateTimeString: any) {
  const dateTime = new Date(dateTimeString);
  const timeAgo = formatDistanceStrict(dateTime, new Date(), {
    addSuffix: true,
  });
  return timeAgo;
}

/**
 * Opens allowed URIs. if isSafeUri is set to true then this will open http:// and https:// as well as some deeplinks.
 * Only set this flag to true if you have formed the URL yourself in our own app code. For any URLs from an external source
 * isSafeUri must be false and it will only open http:// and https:// URI schemes.
 *
 * @param openExternalBrowser whether to leave the app and open in system browser. default is false, opens in-app browser window
 * @param isSafeUri whether to bypass ALLOWED_EXTERNAL_URI_SCHEMES check
 * @param controlscolor When opening in an in-app browser, determines the controls color
 **/
export async function openUri(
  uri: string,
  openExternalBrowser = false,
  isSafeUri = false,
  // NOTE: okay to use theme object directly as we want the same color for light/dark modes
  controlsColor = theme.colors.primary
): Promise<void> {
  const trimmedURI = uri.trim();
  if (
    !isSafeUri &&
    !ALLOWED_EXTERNAL_URI_SCHEMES.some((scheme) =>
      trimmedURI.startsWith(scheme)
    )
  ) {
    // TODO: [MOB-3925] show a visual warning that the link cannot be opened.
    console.log(
      'linking',
      'openUri',
      `potentially unsafe URI scheme provided ${uri}`
    );
    return;
  }

  const supported = await Linking.canOpenURL(uri);
  if (!supported) {
    console.log('linking', 'openUri', `Cannot open URI: ${uri}`);
    return;
  }

  try {
    if (openExternalBrowser) {
      await Linking.openURL(uri);
    } else {
      await WebBrowser.openBrowserAsync(uri, {
        controlsColor,
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
      });
    }
  } catch (error) {
    console.log('linking', 'openUri', `${error}`);
  }
}

// format price into PKR
export function formatPrice(price: number) {
  let rupee = new Intl.NumberFormat('en-PKR', {
    style: 'currency',
    currency: 'PKR',
  });

  let string = rupee.format(price).toString();

  return string.substring(0, string.length - 3);
}

/**
 * Used to format user addresses
 */
export const formatUserAddresses = (data: any) => {
  return data.map((ele) => {
    return {
      addressId: ele.id,
      id: ele.id,
      address: ele.location,
      addressType: ele.addressType,
      nearestLandmark: ele.landmark,
      deliveryInstructions: ele.specialInstructions,
      coordinates: { lat: ele.lat, lon: ele.long },
      lat: ele.lat,
      lng: ele.long,
    };
  });
};

// open device settings to enable gps.
export function openDeviceSettings() {
  if (Platform.OS === 'ios') {
    Linking.openURL('App-Prefs:Privacy&path=LOCATION');
  } else {
    Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
  }
}
