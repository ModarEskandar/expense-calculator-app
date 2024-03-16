import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("screen").width;
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffff",
      alignItems: "center",
    },
    card: {
      backgroundColor: "#1f1f1f",
      width: '90%',
      marginTop: '20%',
      borderRadius: 20,
      padding: '10%',
  },
  expenseFormContainer:{flex: 1,
    backgroundColor: "#1f1f1f",
    width: '90%',
    marginTop: '20%',
    borderRadius: 20,
    maxHeight: 570,
    padding: '10%',},
  expense_container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 14,
    marginHorizontal:10,
    alignItems: "center",
    backgroundColor: "#3b3b3b",
    elevation: 10,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 10,
    marginVertical: 14,
    marginHorizontal:10,
    alignItems: "center",
    backgroundColor: "#3b3b3b",
    elevation: 10,
  },
  formFooter: {
    flexDirection: "row",
    marginVertical:10
  },
  mainHeader: {
    flexDirection: "row",
    margin:10,
    justifyContent:'space-between'
  },
    helloText: {
      color: "white",
      marginBottom: 30,
      fontSize: 25,
      textAlign:'center'
    },
    navLink: {
      color: "purple",
      marginBottom: 30,
      fontSize: 25,
      textAlign:'center',
      fontWeight: "500"
    },
    textInput: {
      padding: 5,
      paddingStart: 15,
      backgroundColor: "#3b3b3b",
      width: screenWidth * 0.7,
      borderRadius: 15,
      marginBottom: 15,
      color: "white",
      fontWeight: "600",

    },
    searchInput: {
      padding: 5,
      paddingStart: 15,
      backgroundColor: "#ffffff",
      width: screenWidth * 0.28,
      borderColor:'white',
      marginTop:5,
      borderRadius: 15,
      marginBottom: 15,
      color: "white",
      fontWeight: "600",

    },
    selectBtnText: {
        fontWeight: "600",
        fontSize: 12,
        textAlign:'left'
    },
    selectItem:{
        margin:10
    },
    floatBtn:{
        position: 'absolute',
    bottom: 0,
    margin:20,
    alignItems:'center',
    
},
fab: {
    position: 'relative',
    right: 0,
    bottom: 0,
    backgroundColor:'purple'

},
    textArea:{
        textAlignVertical: 'top',
        maxHeight:80
    },
    submitBtn: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      backgroundColor: "purple",
      borderRadius: 25,
      color: "white",
      textAlign: "center",
      marginVertical: 15,
      alignItems:'center'
    },
    buttonAlt: {
      width: '80%',
      borderWidth: 1,
      height: 40,
      borderRadius: 50,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
  },
    welcomeText: {
      color: "white",
      marginBottom: 20,
      fontSize: 30,
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
    label: {
        fontSize: 14,
        marginLeft: '5%',
    },
  errorMessage: {
    fontSize: 12,
    color:'red'
},
  });