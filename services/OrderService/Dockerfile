FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app


COPY *.csproj ./
RUN dotnet restore


RUN dotnet add package dotenv.net --version 3.0.0


COPY . ./
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app


COPY --from=build /app/out .

EXPOSE 80

ENTRYPOINT ["dotnet", "OrderService.dll"]
