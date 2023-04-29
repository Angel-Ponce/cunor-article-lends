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
import {
  format,
  formatDistance,
  formatDuration,
  intervalToDuration,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";

const PDF: FC<{ lend: LendQuery["lend"] }> = ({ lend }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center p-0">
      <PDFViewer showToolbar width="100%" height="100%">
        <Document>
          <Page
            size="LETTER"
            style={{
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              fontSize: 12,
            }}
          >
            {/* HEADER */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexGrow: 1,
                  display: "flex",
                  gap: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/usac-logo.png"
                  style={{ width: 60, height: "auto" }}
                />
                <View>
                  <Text style={{ fontSize: 16, marginBottom: 2 }}>
                    Prestamo de artículos #{lend.id}
                  </Text>
                  <Text style={{ fontSize: 9 }}>
                    Centro Universitario del Norte -CUNOR-
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 2,
                }}
              >
                <Text>Fecha de emisión: {new Date().toLocaleDateString()}</Text>
                <Text style={{ fontSize: 9, color: "gray" }}>
                  Hora de emisión: {new Date().toLocaleTimeString()}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "black",
                marginTop: 10,
                marginBottom: 10,
              }}
            />
            {/* CONTENT */}
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ flexGrow: 1 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    marginBottom: 8,
                  }}
                >
                  <Text>Usuario: </Text>
                  <Text style={{ color: "#484a48", fontSize: 10 }}>
                    {lend.user.name} {lend.user.lastname}
                  </Text>
                </View>
                <View
                  style={{ display: "flex", flexDirection: "column", gap: 5 }}
                >
                  <Text>Profesor: </Text>
                  <Text style={{ color: "#484a48", fontSize: 10 }}>
                    {lend.professor.name} {lend.professor.lastname}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                {" "}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    marginBottom: 8,
                  }}
                >
                  <Text>Fecha de prestamo</Text>
                  <Text style={{ color: "#484a48", fontSize: 10 }}>
                    {format(
                      parseISO(lend.createdAt),
                      "dd/MM/yy 'a las' hh:mm aaaa"
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <Text>Fecha de devolución</Text>
                  <Text style={{ color: "#484a48", fontSize: 10 }}>
                    {format(
                      parseISO(lend.dueDate),
                      "dd/MM/yy 'a las' hh:mm aaaa"
                    )}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Text style={{ textAlign: "justify" }}>
                Yo {lend.professor.name} {lend.professor.lastname}
                {", "}
                Docente/Administrativo, me hago responsable de los siguientes
                artículos prestados que se me fueron entregados en la siguiente
                fecha y hora: {parseISO(
                  lend.createdAt
                ).toLocaleDateString()}{" "}
                {parseISO(lend.createdAt).toLocaleTimeString()} y que deben ser
                devueltos en un plazo máximo de{" "}
                {formatDuration(
                  intervalToDuration({
                    start: parseISO(lend.createdAt),
                    end: parseISO(lend.dueDate),
                  }),
                  {
                    locale: es,
                    format: ["days", "hours", "minutes"],
                  }
                )}
                .
              </Text>
            </View>
            <Text style={{ marginBottom: 12, fontSize: 14 }}>
              Artículos prestados:{" "}
            </Text>
            {lend.articles.map((a) => (
              <Text
                style={{ fontSize: 10, color: "#484a48" }}
                key={a.article.id}
              >
                <Text style={{ color: "black" }}>
                  - x{a.count} {a.article.name}
                </Text>{" "}
                ({a.article.serial}) · estado: {a.initialPhisicalState.name}
                {", "}
                desc.: {a.article.description}
              </Text>
            ))}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 60,
              }}
            >
              <View
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <View
                  style={{ width: 120, height: 1, backgroundColor: "black" }}
                />
                <Text>
                  {lend.professor.name} {lend.professor.lastname}
                </Text>
                <Text style={{ fontSize: 9, color: "#484a48" }}>
                  Entrega de artículos
                </Text>
              </View>
              <View
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {" "}
                <View
                  style={{ width: 120, height: 1, backgroundColor: "black" }}
                />
                <Text>
                  {lend.professor.name} {lend.professor.lastname}
                </Text>
                <Text style={{ fontSize: 9, color: "#484a48" }}>
                  Devolución de artículos
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PDF;
