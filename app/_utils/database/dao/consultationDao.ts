"use client";
import { getDatabase } from "../getDatabase";
import {
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateSelectQuery,
  mapResultsToKeyValue,
} from "../generator/queryGenerator";
import ConsultationModel from "@/app/_models/consultation";

export class ConsultationDao {
  async insertConsultation(consultation: ConsultationModel): Promise<void> {
    const db = await getDatabase();
    const consultationData = consultation.toJson();
    consultationData.createdAt = new Date().toISOString();
    consultationData.updatedAt = new Date().toISOString();
    const query = generateInsertQuery("consultation", consultationData);
    db.run(query);
  }

  async updateConsultation(id: number, consultation: Partial<ConsultationModel>): Promise<void> {
    const db = await getDatabase();
    const updatedData = Object.keys(consultation).reduce((acc, key) => {
      const value = (consultation as any)[key];
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    if (Object.keys(updatedData).length === 0) {
      throw new Error("No valid fields to update.");
    }

    const query = generateUpdateQuery("consultation", updatedData, `id = ${id}`);
    db.run(query);
  }

  async deleteConsultation(id: number): Promise<void> {
    const db = await getDatabase();
    const query = generateDeleteQuery("consultation", `id = ${id}`);
    db.run(query);
  }

  async getConsultation(id: number): Promise<ConsultationModel | null> {
    const db = await getDatabase();
    const query = generateSelectQuery("consultation", `id = ${id}`);
    const result = db.exec(query);
  
    if (result.length === 0 || !result[0].values.length) {
      return null;
    }
  
    const consultations = mapResultsToKeyValue(result);
    const consultationData = consultations[0];
  
    return ConsultationModel.fromJson({
      id: consultationData.id,
      clientId: consultationData.clientId,
      title: consultationData.title,
      content: consultationData.content,
      detailedContent: consultationData.detailedContent,
      consultationTime: consultationData.consultationTime,
      consultationTimeDetail: consultationData.consultationTimeDetail,
      consultationAddress: consultationData.consultationAddress,
      consultationAddressDetail: consultationData.consultationAddressDetail,
      createdAt: consultationData.createdAt,
      updatedAt: consultationData.updatedAt,
    });
  }
  
  async getAllConsultations(): Promise<ConsultationModel[]> {
    const db = await getDatabase();
    const query = generateSelectQuery("consultation");
    const result = db.exec(query);
  
    const consultations = mapResultsToKeyValue(result);
  
    return consultations.map(consultationData => {
      return ConsultationModel.fromJson({
        id: consultationData.id,
        clientId: consultationData.clientId,
        title: consultationData.title,
        content: consultationData.content,
        detailedContent: consultationData.detailedContent,
        consultationTime: consultationData.consultationTime,
        consultationTimeDetail: consultationData.consultationTimeDetail,
        consultationAddress: consultationData.consultationAddress,
        consultationAddressDetail: consultationData.consultationAddressDetail,
        createdAt: consultationData.createdAt,
        updatedAt: consultationData.updatedAt,
      });
    });
  }
  async getConsultationsByClientId(clientId: number): Promise<ConsultationModel[]> {
    const db = await getDatabase();
    const whereClause = `clientId = ${clientId}`;
    const query = generateSelectQuery("consultation", whereClause);
    const result = db.exec(query);
  
    const consultations = mapResultsToKeyValue(result);
  
    return consultations.map(consultationData => {
      return ConsultationModel.fromJson({
        id: consultationData.id,
        clientId: consultationData.clientId,
        title: consultationData.title,
        content: consultationData.content,
        detailedContent: consultationData.detailedContent,
        consultationTime: consultationData.consultationTime,
        consultationTimeDetail: consultationData.consultationTimeDetail,
        consultationAddress: consultationData.consultationAddress,
        consultationAddressDetail: consultationData.consultationAddressDetail,
        createdAt: consultationData.createdAt,
        updatedAt: consultationData.updatedAt,
      });
    });
  }
  
}
