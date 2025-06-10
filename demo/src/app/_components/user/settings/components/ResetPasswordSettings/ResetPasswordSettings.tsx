import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { JumboForm, JumboInput } from "@jumbo/vendors/react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { SettingHeader } from "../../SettingHeader";

const ResetPasswordSettings = () => {
  return (
    <Div sx={{ mb: 2 }}>
      <SettingHeader title={"Change Password"} divider sx={{ mb: 3 }} />
      <JumboCard contentWrapper>
        <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
          <Div>
            <img
              width={244}
              height={280}
              src={`${ASSET_IMAGES}/auth/forgot-pass.png`}
              alt="Reset password"
            />
          </Div>
          <Div>
            <Typography variant="h4">{"Reset your password"}</Typography>
            <Typography variant="body1" mb={2}>
              {
                "Current Password is required to reset your existing password with a new password"
              }
            </Typography>

            <JumboForm onChange={() => {}}>
              <Div
                sx={{
                  "& .MuiTextField-root": {
                    mb: 2.5,
                  },
                }}
              >
                <JumboInput
                  fieldName="currentPassword"
                  placeholder="Current Password"
                  size="small"
                  type="password"
                  fullWidth
                />
                <JumboInput
                  fieldName="newPassword"
                  placeholder="New Password"
                  type="password"
                  size="small"
                  fullWidth
                />
                <JumboInput
                  fieldName="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  size="small"
                  fullWidth
                />
                <LoadingButton
                  // type='submit'
                  variant="contained"
                  sx={{ boxShadow: "none", pt: 1 }}
                >
                  Save Password
                </LoadingButton>
              </Div>
            </JumboForm>
          </Div>
        </Stack>
      </JumboCard>
    </Div>
  );
};

export { ResetPasswordSettings };
