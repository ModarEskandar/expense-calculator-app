import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useCreateExpense, useGetCategories, useUpdateExpense } from '../lib/react-query/queries';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExpenseSchema } from '../lib/vlaidations';
import { styles } from '../styles';
import { Category, ExpenseFormProps } from '../types';
import { useContext, useEffect } from 'react';
import AppContext from '../AppContext';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, ChevronUpIcon, TvIcon } from 'lucide-react-native';

const ExpenseForm = ({ expense, action }: ExpenseFormProps) => {
    const { mutateAsync: createExpense, isPending: isCreatingExpense } =
    useCreateExpense();
    const { mutateAsync: updateExpense, isPending: isUpdatingExpense } =
    useUpdateExpense();
    const { data: categories, isPending: isCategoriesLoading } = useGetCategories();
    const {userDetails} = useContext(AppContext);
    const navigation = useNavigation();

    const {control,handleSubmit } = useForm({
        resolver: zodResolver(ExpenseSchema),
        defaultValues: {
            name: expense ? expense.name : "",
            date: expense ? expense.date : new Date(),
            amount: expense ? expense.amount.toString() : "1",
            category: expense ? expense.category:"",
            description : expense ? expense.description : "",
            user : expense ? expense.user : 'userDetails._id'
          },
      });
      async function onSubmitHandler(values: z.infer<typeof ExpenseSchema>) {
        
        if (expense && action === "Update") {

            
          const updatedExpense = await updateExpense({
            ...values,
            _id: expense?._id,
    
          });
          if (!updatedExpense) {
            Alert.alert(`${action} expense failed. Please try again.`);
            return;
          }
          return navigation.navigate("Home");
        }
        
        const newExpense = await createExpense({
          ...values,
          user: userDetails._id,
        });
        if (!newExpense)
          {
            Alert.alert(`${action} expense failed. Please try again.`);
          return navigation.reset("Expense");
        }
         navigation.navigate("Home");
    }
    return (
        <View >
            <View >
              <Controller
              control={control}
              name={'name'}
              render={({ field: { value, onChange, onBlur,name },fieldState: { error }})=>(
                <>
                <Text style={styles.label}>{name}</Text>
                <Text style={styles.errorMessage}>
                {error && error.message}
                      </Text>
                      <TextInput
                placeholder='name'
                style={styles.textInput}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                />
                
                </>)}
                />
                        
                <Controller
              control={control}
              name={'amount'}

              render={({ field: { value, onChange, onBlur,name },fieldState: { error }})=>(
                <>
                <Text style={styles.label}>{name}</Text>

                <Text style={styles.errorMessage}>
                {error && error.message}
                      </Text>
                      <TextInput
                      keyboardType="numeric"
                placeholder='amount'
                style={styles.textInput}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                
                />
                
                </>)}
                /> 
                
                <Controller
              control={control}
              name={'description'}
              render={({ field: { value, onChange, onBlur,name },fieldState: { error }})=>(
                <>
                <Text style={styles.label}>{name}</Text>
                <Text style={styles.errorMessage}>
                {error && error.message}
                      </Text>
                      <TextInput
                placeholder='description'
                style={[styles.textInput,styles.textArea]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline={true}
                numberOfLines={5}
                />
                
                </>)}
                />
                <Controller
              control={control}
              name={'category'}
              render={({ field: { value, onChange, onBlur,name },fieldState: { error }})=>(
                <>
                <Text style={styles.label}>{name}</Text>
                <Text style={styles.errorMessage}>
                {error && error.message}
                      </Text>
                      <SelectDropdown
              data={categories??[]}
              onSelect={(selectedItem:Category, index) => {
                onChange(selectedItem._id);
              }}
              renderDropdownIcon={isOpened => {
                return (isOpened?<ChevronUpIcon  color={'white'} size={12}/>:<ChevronDownIcon color={'white'} size={12}/>);
              }}
              renderCustomizedRowChild={(item:Category, index) => {
                return (
                    <Text style={styles.selectItem}>{item.name}</Text>
                );
              }}
              defaultButtonText={expense?.categoryName??'Select Category'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              buttonStyle={styles.textInput}
              buttonTextStyle={styles.selectBtnText}
          />
                
                </>)}
                />
                
              <TouchableOpacity  onPress={(handleSubmit(onSubmitHandler))}  disabled={false} style={ [styles.submitBtn,{ opacity: true ? 1 : 0.5 }]}>
                  <Text >{action} Expense</Text>
              </TouchableOpacity>
                          
    
            </View>
        </View>
      );
}

export default ExpenseForm

