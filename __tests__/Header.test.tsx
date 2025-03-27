import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Header from './../src/components/Header';

// FontAwesomeIcon Mock
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: 'MockedIcon'
}));

//Test name header
describe('Header Component', () => {

  //Simulating the functions
  const mockSetIsDarkMode = jest.fn();
  const mockSetModalVisible = jest.fn();
  const mockSetScreen = jest.fn();

  const colors = {
    primary: "#ffffff",
    secundary: "#ffffff",
    third: "#ffffff",
    backgroundColor1: "#ffffff",
    backgroundColor2: "#ffffff",
    backgroundColor3: "#ffffff",
    special: "#ffffff"
  };

  const defaultProps = {
    colors,
    setIsDarkMode: mockSetIsDarkMode,
    isDarkMode: false,
    setModalVisible: mockSetModalVisible,
    setScreen: mockSetScreen,
  };

  it('it has to become dark mode or light mode when the light theme button is pressed', () => {
    // Rendering the header
    const { getByTestId } = render(<Header {...defaultProps} />);

    // Finding the button by ID
    const lightThemeButton = getByTestId('light-theme-button');
    
    //Checking the click on the lightButton
    fireEvent.press(lightThemeButton);

    // Checking that when clicking the darkModeFunction is called
    expect(mockSetIsDarkMode).toHaveBeenCalled();
  });

  it('it has to open the search modal when the search button is pressed', () => {
    // Rendering the header
    const { getByTestId } = render(<Header {...defaultProps} />);

    // Finding the button by ID
    const searchButton = getByTestId('search-button');
    
    //Checking the click on the searchButton
    fireEvent.press(searchButton);

    // Checking that when clicking the setModalVisible is called
    expect(mockSetModalVisible).toHaveBeenCalledWith(true);
  });
});



