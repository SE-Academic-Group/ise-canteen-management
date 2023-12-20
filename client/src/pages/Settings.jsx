import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import BackgroundHeading from "../ui/BackgroundHeading";
import Row from "../ui/Row";

function Settings() {
  return (
    <Row>
      <BackgroundHeading as="h1">Cài đặt</BackgroundHeading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
