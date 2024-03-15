import { Alert, Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../styles";
import { ExpenseCardProps } from "../types";
import { ExternalLinkIcon } from "lucide-react-native";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { useDeleteExpense } from "../lib/react-query/queries";

const ExpenseCard = ({expense} : ExpenseCardProps) => {
    const {_id,name,date,category,amount,description} = expense;
    const navigation = useNavigation();
    const { mutateAsync: deleteExpense, isPending: isDeletingExpense } =
    useDeleteExpense();
    const deleteExpenseHandler =  async () => {
        const deletResult = await deleteExpense(expense?._id!);
        if (!deletResult) { 
            Alert.alert(`Delete expense failed. Please try again.`);
        }
      }
    const deleteConfirmationPopup = () => {
        Alert.alert(
          "Confirmation",
          "You are about to delete this expense?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => deleteExpenseHandler(),
            },
          ],
          { cancelable: true }
        );
      };
  return (
    <TouchableOpacity
      style={styles.expense_container}
      onLongPress={() => deleteConfirmationPopup()}
      onPress={() =>
         {            
          navigation.navigate("Expense", {expense:expense});
        }
      }
    >
        <View style={{ flex: 0.2 }}>
        <ExternalLinkIcon color={'purple'} size={26} />
      </View>
      <View style={{ flex: 0.4 }}>
        <Text
          style={{ color: "white", fontSize: 18 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        <Text
          style={{ fontSize: 14, marginTop: 6 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
            {description}
          {/* {format(date, "PPP")} */}
        </Text>
        {/* <Text
          style={{ fontSize: 14, marginTop: 6 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
            {date.toString()}
        </Text> */}
      </View>
      <View style={{ flex: 0.2 }}>
      <Text
          style={{ fontSize: 14, marginTop: 6 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
            {format(date, "PPP")}
          {/* {format(date, "PPP")} */}
        </Text>
      </View>
      <View style={{ flex: 0.2, alignItems: "flex-end" }}>
        <Text
          style={{
            fontSize: 18,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          ${amount.toString()}
        </Text>
      </View>

    </TouchableOpacity>
  )
}

export default ExpenseCard