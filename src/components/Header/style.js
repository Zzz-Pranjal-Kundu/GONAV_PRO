import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#333",
  },
  title: {
    flexGrow: 1,
  },
  search: {
    marginRight: theme.spacing(2), // Controls the space between the search bar and other elements
    flex: 1, // Ensure search bar occupies available space
  },
  input: {
    backgroundColor: "#fff", // White background
    padding: "5px 10px", // Padding inside the search input
    borderRadius: "4px", // Rounded corners for the input
    marginRight: theme.spacing(1), // Optional: adds space after the search input
  },
}));

export default useStyles;
