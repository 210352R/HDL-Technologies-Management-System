import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { AuthProvider } from "./context/auth";
import HomePage from "./pages/home/HomePage";

import AddBillForm from "./pages/services/bill/NewBillPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import BackupScreen from "./pages/backup/BackupScreen";
import BillList from "./pages/bills/DispalyAllBills";
import UserList from "./pages/users/UserList";

import SubmitBillPage from "./pages/bills/UpdateBillPage";
import UpdateOptionsPage from "./pages/bills/ChooseUpdatePage";
import ProfileScreen from "./pages/settings/ProfileScreen";
import UpdateAnnounceDatePage from "./pages/bill_updates/UpdateAnnounceDatePage";
import UpdateHandOverDatePage from "./pages/bill_updates/UpdateHandoverDate";
import MarkBillCompletedPage from "./pages/bill_updates/MarkBillCompletedPage";
import MarkBillCanceledPage from "./pages/bill_updates/MarkBillCancelledPage";
import UpdateBillIssuePage from "./pages/bill_updates/UpdateBillIsuePage";
import UpdateAmountPage from "./pages/bill_updates/UpdateAmountPage";
import UpdateLapDetailsPage from "./pages/bill_updates/UpdateLapDetailsPage";
import FindUserByPhone from "./pages/users/FindUserPage";
import CompanyHomePage from "./pages/company/CompanyHomePage";
import MarkBillPaidPage from "./pages/bill_updates/MarkBillPaidPage";
import DeleteBillPage from "./pages/bill_updates/DeleteBillPage";
import CompanyBillList from "./pages/company/DisplayAllCompanyBills";

// Public routes (accessible without authentication)
export const publicRoutes = [
  { path: "/", element: LoginPage },
  // { path: "/register", element: RegisterPage },
];
// Protected routes (accessible only after authentication)
export const protectedRoutes = [
  { path: "/home", element: HomePage },
  { path: "/admin/newbill", element: AddBillForm },
  { path: "/forgot-password", element: ForgotPassword },
  { path: "/memory-backup", element: BackupScreen },
  { path: "/all-bills", element: BillList },
  { path: "/users", element: UserList },
  { path: "/settings", element: ProfileScreen },
  { path: "/update-bills", element: SubmitBillPage },
  { path: "/choose-option/:billId", element: UpdateOptionsPage },
  { path: "/update-announce-date/:billId", element: UpdateAnnounceDatePage },
  { path: "/update-handover-date/:billId", element: UpdateHandOverDatePage },
  { path: "/mark-bill-completed/:billId", element: MarkBillCompletedPage },
  { path: "/mark-bill-cancalled/:billId", element: MarkBillCanceledPage },
  { path: "/update-bill-issue/:billId", element: UpdateBillIssuePage },
  { path: "/update-bill-amount/:billId", element: UpdateAmountPage },
  { path: "/update-lap-details/:billId", element: UpdateLapDetailsPage },
  { path: "/mark-bill-paid/:billId", element: MarkBillPaidPage },
  { path: "/delete-bill/:billId", element: DeleteBillPage },
  { path: "/find-user", element: FindUserByPhone },
  { path: "/company", element: CompanyHomePage },
  { path: "/company-bills", element: CompanyBillList },
];
