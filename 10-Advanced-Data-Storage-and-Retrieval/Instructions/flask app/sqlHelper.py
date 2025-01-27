from sqlalchemy import create_engine
import pandas as pd
import numpy as np

class SQLHelper():

    def __init__(self):
        self.connection_string = "sqlite:///data\\hawaii.sqlite"
        self.engine = create_engine(self.connection_string)

    def precipitation(self):
        query1 = f"""
                SELECT
                    date,
                    station,
                    prcp
                FROM
                    measurement
                WHERE
                    date >= (
                                SELECT
                                    date(MAX(date), '-365 day')
                                FROM
                                    measurement
                            )
                ORDER BY
                    date, station

                """

        conn = self.engine.connect()
        df = pd.read_sql(query1, con=conn)
        conn.close()

        return df

    def allStations(self):
        query2 = f"""
                SELECT
                    s.station,
                    s.name, 
                    s.latitude, 
                    s.longitude, 
                    s.elevation,
                    count(*) as tot_obs
                FROM
                    station s
                    JOIN measurement m on s.station = m.station
                GROUP BY
                    s.station, s.name, s.latitude, s.longitude, s.elevation
                ORDER BY
                    count(*) desc
                """

        conn = self.engine.connect()
        df = pd.read_sql(query2, con=conn)
        conn.close()

        return df


    def tobsMostActive(self):

        query3 = f"""
                SELECT
                        date,
                        station,
                        tobs
                    FROM
                        measurement
                    WHERE
                        date >= (
                                    SELECT
                                        date(MAX(date), '-365 day')
                                    FROM
                                        measurement
                                )
                        AND
                        station = (
                                    SELECT
                                        s.station
                                    FROM
                                        station s
                                    JOIN measurement m on s.station = m.station
                                    GROUP BY s.station
                                    ORDER BY
                                        count(*) desc
                                    LIMIT 1
                                )
                    ORDER BY
                        date, station
                    """
    

        conn = self.engine.connect()
        df = pd.read_sql(query3, con=conn)
        conn.close()

        return df

    def tempDataRange(self, start_date, end_date):
        query4 = f"""
                SELECT
                    min(tobs) as min_tobs,
                    max(tobs) as max_tobs,
                    avg(tobs) as avg_tobs
                FROM
                    measurement
                WHERE
                    date >= '{start_date}'
                    AND date <= '{end_date}'
                """ 
        
        conn = self.engine.connect()
        df = pd.read_sql(query4, con=conn)
        conn.close()

        return df

    def tempDataDate(self, start_date):
        query5 = f"""
                SELECT
                    min(tobs) as min_tobs,
                    max(tobs) as max_tobs,
                    avg(tobs) as avg_tobs
                FROM
                    measurement
                WHERE
                    date = '{start_date}'
                """ 
        
        conn = self.engine.connect()
        df = pd.read_sql(query5, con=conn)
        conn.close()

        return df
