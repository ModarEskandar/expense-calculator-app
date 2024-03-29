export type INavLink = {
    img_url: string;
    route: string;
    label: string;
  };

  export type IUser = {
    _id: string;
    name: string;
    email: string;
  
  };

  export type INewUser = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };  
  export type IContextType = {
    userDetails: IUser;
    isLoading: boolean;
    setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
  };

  export type ExpenseCardProps = {
    expense: ExpenseWithNames;
  };
  export type ExpenseFormProps = {
    expense?: ExpenseWithNames;
    action: "Create" | "Update";
  };

  export type ExpenseTableProps = {
    data: ExpenseWithNames[];
    categories: Category[]
  };

  export type Expense = {
    _id: string;
    name: string;
    date: Date;
    amount:number;
    description:string;
    category: string;
    user:string;
  };

  export type ExpenseWithNames = {
    _id: string;
    name: string;
    date: Date;
    amount:number;
    description:string;
    category: string;
    categoryName: string;
    user:string;
  };

  export type Category = {
    _id: string;
    name: string;
  };

  export type INewExpense={
    name: string;
    date: Date;
    amount:number;
    description?:string;
    category: string;
    user:string;}

  export type IUpdateExpense={
    _id: string;
  }
  