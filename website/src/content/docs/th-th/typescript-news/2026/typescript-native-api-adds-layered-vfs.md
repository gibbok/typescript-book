---
title: API เนทีฟของ TypeScript เพิ่มระบบไฟล์เสมือนแบบเป็นชั้น
description: API เนทีฟของ TypeScript สามารถอัปเดต snapshot ด้วยระบบไฟล์เสมือนในหน่วยความจำหรือแบบเป็นชั้น รวมถึงการเพิ่ม แก้ไข ลบ และ fallback ไปยัง host
lastUpdated: 2026-09-09
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-09'
---

**เผยแพร่:** 9 กันยายน 2026

API เนทีฟของ TypeScript สามารถสร้างและอัปเดต snapshot ด้วยข้อมูลระบบไฟล์เสมือนที่ระบุอย่างชัดเจนได้แล้ว เครื่องมือจึงจำลองการเพิ่ม แก้ไข และลบไฟล์ได้โดยไม่ต้องสร้างข้อมูลอินพุตของระบบไฟล์ใหม่ทั้งหมด

## สิ่งที่เปลี่ยนแปลง

ตัวช่วยใหม่ `createFileSystem`, `createFileSystemWithLib` และ `createFileSystemLayer` สร้างออบเจ็กต์ VFS ที่ API ของ snapshot รองรับ ส่วน `Snapshot.update` สามารถใช้เลเยอร์แคชใหม่ทับ snapshot ที่มีอยู่ได้

VFS แบบ `full` อยู่ในหน่วยความจำทั้งหมดและไม่ fallback ไปยัง callback ของระบบไฟล์ host หรือ session ส่วน VFS แบบ `layer` จะ fallback ไปยัง host เมื่อ cache miss และใช้ `removedPaths` เพื่อซ่อนไฟล์หรือไดเรกทอรีที่มีอยู่บน host ได้ ทั้งสองแบบรองรับ symbolic link ภายในระบบไฟล์เสมือนและไปยัง path ของ host

## ข้อจำกัดปัจจุบัน

snapshot ที่ใช้ VFS ยังนับเป็น snapshot จริง ดังนั้น API เนทีฟยังคงข้อจำกัดให้มี snapshot จริงได้ครั้งละหนึ่งรายการ การทำงานกับ snapshot จึงยังเป็นแบบลำดับในขณะนี้

## แหล่งข้อมูล

อ่าน pull request ของ TypeScript ที่ merge แล้ว: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
