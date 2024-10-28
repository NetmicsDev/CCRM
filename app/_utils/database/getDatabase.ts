"use client";
import initSqlJs, { Database } from "sql.js";
import { setupTables } from "./tableSetup";
import {
  loadDatabaseFromDrive,
  updateDatabaseToDrive,
  uploadDatabaseToDrive,
} from "@/app/_services/google/customer";

declare global {
  interface Window {
    sqliteDB?: Database;
    dbInitPromise?: Promise<Database>; // 데이터베이스 초기화 중인 Promise 저장
  }
}

// 데이터베이스 인스턴스를 전역적으로 관리하는 함수
export async function getDatabase(): Promise<Database> {
  // 데이터베이스가 이미 존재하면 즉시 반환
  if (window.sqliteDB) {
    console.log("Using existing global database.");
    return window.sqliteDB;
  }

  // 데이터베이스가 초기화 중이라면, 그 Promise를 기다림
  if (window.dbInitPromise) {
    return window.dbInitPromise;
  }

  window.dbInitPromise = initializeDatabase();

  window.sqliteDB = await window.dbInitPromise;
  window.dbInitPromise = undefined;

  return window.sqliteDB;
}

// 데이터베이스 초기화
async function initializeDatabase(): Promise<Database> {
  const SQL = await initSqlJs({
    locateFile: (file) =>
      "https://minio-data.habartech.com/ccrm-dev/statics/sql-wasm.wasm",
  });

  // ** 드라이브 결과값에 따라 초기값 세팅 분기
  let db;
  const { data, error } = await loadDatabaseFromDrive();
  if (error || data!.id === "NONE") {
    console.error(error);
    db = new SQL.Database();
    console.log("New database initialized and stored globally.");
    await setupTables(db);
  } else {
    const { id, data: buffer } = data!;
    db = new SQL.Database(buffer);
    console.log("database initialized and stored globally from Drive");
  }

  return db;
}

export async function downloadDatabase(): Promise<void> {
  const db = await getDatabase(); // 현재 데이터베이스 가져오기

  // 데이터베이스를 바이너리 형식으로 추출
  const binaryArray = db.export();

  // ** 드라이브에 추가 **
  // ** data는 추가한 파일의 ID
  const { data, error } = await uploadDatabaseToDrive(
    binaryArray,
    "database.sqlite"
  );
  if (error || !data) {
    console.error(error);
  }
  return;

  // ** 드라이브에 업데이트 **
  // ** DB_ID 필요, 응답은 boolean
  // const isSuccess = await updateDatabaseToDrive(DB_ID, binaryArray);

  // Blob으로 변환
  const blob = new Blob([binaryArray], { type: "application/octet-stream" });

  // 파일 다운로드 링크 생성
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "database.sqlite"; // 다운로드될 파일 이름 설정
  document.body.appendChild(link);

  // 다운로드 실행
  link.click();

  // 링크 삭제
  document.body.removeChild(link);
}

export async function loadDatabaseFromFile(file: File): Promise<Database> {
  const SQL = await initSqlJs({
    locateFile: (file) =>
      "https://minio-data.habartech.com/ccrm-dev/statics/sql-wasm.wasm",
  });

  // ** 드라이브에서 꺼내올 때 사용 **
  // ** data.id는 파일의 ID, data.data는 버퍼데이터
  // ** data.id가 NONE이면 폴더는 있는데 파일이 없는 것
  // const {data, error} = await loadDatabaseFromDrive()
  // if (error || data!.id === "NONE") {
  //   console.error(error)
  //   // return null or undefined
  // }
  // const buffer = data!.data;

  // 파일을 읽고 SQLite 데이터베이스로 변환
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  const db = new SQL.Database(uint8Array); // 파일에서 SQLite DB 생성
  console.log("Database loaded from file and stored globally.");

  window.sqliteDB = db; // 전역적으로 저장하여 이후에 사용할 수 있도록 함

  return db;
}
