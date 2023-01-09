import {StyleSheet} from 'react-native';
import {colors, fonts, height, perfectSize, width} from '../../theme';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: perfectSize(56),
    backgroundColor: colors.primaryBackgroundColor,
  },
  closeImage: {
    height: perfectSize(30),
    width: perfectSize(30),
    resizeMode: 'contain',
    opacity: 0.7,
  },
  listContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  objectImage: {
    height: perfectSize(300),
    width: perfectSize(300),
    resizeMode: 'contain',
    position: 'absolute',
  },
  cardContainer: {
    alignSelf: 'center',
    borderRadius: perfectSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height / 10,
    width: (width * 50) / 100,
    backgroundColor: colors.secondaryBackgroundColor,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 10,
    },
    elevation: 24,
  },
  cardDetailsContainer: {
    height: '100%',
    width: '60%',
    justifyContent: 'center',
    paddingLeft: perfectSize(20),
  },
  cardTitle: {
    color: colors.titleColor,
    fontSize: perfectSize(25),
    fontWeight: 'bold',
    //fontFamily: fonts.avenirHeavy,
    textAlign: 'justify',
  },
  cardDescription: {
    color: colors.titleColor,
    fontSize: perfectSize(14),
    //fontFamily: fonts.quicksandRegular,
    textAlign: 'justify',
    marginTop: perfectSize(10),
  },
  cardImage: {
    height: '70%',
    width: '30%',
    alignSelf: 'center',
  },
});
