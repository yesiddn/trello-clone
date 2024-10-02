export type Colors = 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray' | 'success' | 'danger' | 'primary' | 'gray-light';

export type ObjectColors = Record<Colors, string>;

export const COLORS: ObjectColors = {
  sky: 'bg-sky-500 hover:bg-sky-600 text-white',
  yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  green: 'bg-green-500 hover:bg-green-600 text-white',
  red: 'bg-red-500 hover:bg-red-600 text-white',
  violet: 'bg-violet-500 hover:bg-violet-600 text-white',
  gray: 'bg-gray-500 hover:bg-gray-600 text-white',
  success: 'text-white bg-success-500 hover:bg-success-600 focus:ring-success-300',
  danger: 'text-white bg-red-500 hover:bg-red-600 focus:ring-red-300',
  primary: 'text-white bg-primary-500 hover:bg-primary-600 focus:ring-primary-300',
  'gray-light': 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-100'
}

export const BACKGROUND_COLORS: ObjectColors = {
  sky: 'bg-sky-500',
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  violet: 'bg-violet-500',
  gray: 'bg-gray-500',
  success: 'bg-success-500',
  danger: 'bg-red-500',
  primary: 'bg-primary-500',
  'gray-light': 'bg-gray-200'
}

export const NAVBAR_BACKGROUND_COLORS: ObjectColors = {
  sky: 'bg-sky-700',
  yellow: 'bg-yellow-700',
  green: 'bg-green-700',
  red: 'bg-red-700',
  violet: 'bg-violet-700',
  gray: 'bg-gray-700',
  success: 'bg-success-700',
  danger: 'bg-red-700',
  primary: 'bg-primary-700',
  'gray-light': 'bg-gray-400'
}
