import { render, fireEvent } from '@testing-library/react-native';
import { TablesContext } from './../src/utils/tablesContext';
import NavMenu from './../src/components/NavMenu';
import React from 'react';

// FontAwesomeIcon Mock
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: 'MockedIcon'
}));

//Test name navMenu
describe('NavMenu Component', () => {

  //Simulating the functions
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
    screen: "planetsScreen",
    setModalVisible: mockSetModalVisible,
    setScreen: mockSetScreen,
  };

  it('it has to call the setScreen and setModalVisible when clicking on planet/character/movies button', () => {

    const mockTablesContextValue = {
      planetsCurrentPage: 1, 
      setPlanetsCurrentPage: jest.fn(),
      planetsLastPage: 2, 
      setPlanetsLastPage: jest.fn(),
      moviesCurrentPage: 1, 
      setMoviesCurrentPage: jest.fn(),
      moviesLastPage: 2, 
      setMoviesLastPage: jest.fn(),
      charactersCurrentPage: 1, 
      setCharactersCurrentPage: jest.fn(),
      charactersLastPage: 2, 
      setCharactersLastPage: jest.fn(),
      identifierData: "1", 
      setIdentifierData: jest.fn(),
      choosenData: {nombre: '', altura: '', creado: '', editado: '',ojo_color: '',genero: '',nacimiento_ano: '', cabello_color: '', hogarplaneta: '', masa: '', piel_color: '', url: '', especies: [], naves: [], vehiculos: [], peliculas: []}, 
      setChoosenData: jest.fn()
    };
    
    //It renders the navMenu
    const { getByTestId } = render(
      <TablesContext.Provider value={mockTablesContextValue}>
        <NavMenu {...defaultProps} />
      </TablesContext.Provider>
    );

    // we get the buttons of the navMenu to change the screen
    const planetButton = getByTestId('planet-button');
    const characterButton = getByTestId('character-button');
    const movieButton = getByTestId('movie-button');
    
    //Checking if when clicking the planet button the setScreen is changed to planetsScreen and the modal is set as false
    fireEvent.press(planetButton);
    expect(mockSetScreen).toHaveBeenCalledWith('planetsScreen');
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
    
    //Checking if when clicking the planet button the setScreen is changed to charactersScreen and the modal is set as false
    fireEvent.press(characterButton);
    expect(mockSetScreen).toHaveBeenCalledWith('charactersScreen');
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
    
    //Checking if when clicking the planet button the setScreen is changed to moviesScreen and the modal is set as false
    fireEvent.press(movieButton);
    expect(mockSetScreen).toHaveBeenCalledWith('moviesScreen');
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });
});