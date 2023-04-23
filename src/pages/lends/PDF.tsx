/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { FC } from "react";
import { LendQuery } from "../../graphql/generated/client/graphql";

const PDF: FC<{ lend: LendQuery["lend"] }> = ({ lend }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center p-0">
      <PDFViewer showToolbar width="100%" height="100%">
        <Document>
          <Page
            size="A4"
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                border: 1,
                borderColor: "black",
                padding: 20,
              }}
            >
              <Image
                src="/usac-logo.png"
                style={{ width: 75, height: "auto" }}
              />
              <Text>{lend.professor.name}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PDF;
