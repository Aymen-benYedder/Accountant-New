import { Div } from "@jumbo/shared";
import {
  Box,
  Button,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
const ContactUsForm = () => {
  return (
    <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
      <CardContent>
        <Typography variant="h6" color={"text.secondary"}>
          Send Message
        </Typography>
        <Typography component={"h2"} variant="h1" mb={3}>
          {`Let's talk`}
        </Typography>
        <Box
          component="form"
          sx={{
            mx: -1,

            "& .MuiFormControl-root:not(.MuiTextField-root)": {
              p: 1,
              mb: 2,
              width: { xs: "100%", sm: "50%" },
            },

            "& .MuiFormControl-root.MuiFormControl-fluid": {
              width: "100%",
            },
          }}
          autoComplete="off"
        >
          <FormControl>
            <TextField
              fullWidth
              id="firstname"
              label="Enter Name"
              placeholder="First name"
            />
          </FormControl>
          <FormControl>
            <TextField
              fullWidth
              id="lastname"
              label="Last Name"
              placeholder="Last name"
            />
          </FormControl>
          <FormControl>
            <TextField
              fullWidth
              id="email"
              label="Email"
              placeholder="Enter email address"
            />
          </FormControl>
          <FormControl>
            <TextField
              fullWidth
              id="phoneno"
              label="Phone No."
              placeholder="Enter phone number"
            />
          </FormControl>
          <FormControl className="MuiFormControl-fluid">
            <TextField
              fullWidth
              id="website"
              label="Website"
              placeholder="Enter URL"
            />
          </FormControl>
          <FormControl className="MuiFormControl-fluid">
            <TextField
              fullWidth
              id="help"
              multiline
              rows={4}
              label="How can we help you?"
              placeholder="How can we help you?"
            />
          </FormControl>
          <Div sx={{ mx: 1 }}>
            <Button variant={"contained"}>Submit</Button>
          </Div>
        </Box>
      </CardContent>
    </Div>
  );
};

export { ContactUsForm };
