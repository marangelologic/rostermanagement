package com.conn.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionUtil {
	private static Connection conn = null;

	public static Connection connectUtil() {
		try {
			conn = DriverManager.getConnection(
					"jdbc:postgresql://10.91.22.235:5432/reporting",
					"postgres", "P0stgres");

		} catch (SQLException e) {
			e.getMessage();
		}

		return conn;
	}

}
